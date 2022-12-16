package group.artifact.entity.Comment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CommentFiles")
public class CommentFiles {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String link;
    @ManyToOne
    @JoinColumn(name = "commentId")
    private Comment comment;
}
